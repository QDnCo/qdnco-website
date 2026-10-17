import unittest
from deploy import plan, safe_path

class DeploymentGuards(unittest.TestCase):
    def test_noop(self):
        self.assertEqual(plan({'a':'1'}, {'a':'1'}, {'a':'1'}), [])
    def test_update_and_new(self):
        self.assertEqual(plan({'a':'2','b':'3'}, {'a':'1'}, {'a':'1','b':None}), ['a','b'])
    def test_refuse_drift(self):
        with self.assertRaises(ValueError):plan({'a':'2'}, {'a':'1'}, {'a':'3'})
    def test_refuse_new_collision(self):
        with self.assertRaises(ValueError):plan({'a':'1'}, {}, {'a':'other'})
    def test_refuse_removal(self):
        with self.assertRaises(ValueError):plan({}, {'a':'1'}, {'a':'1'})
    def test_allow_listed_removal(self):
        self.assertEqual(plan({'a':'1'}, {'a':'1','b':'2'}, {'a':'1','b':'2'}, {'b'}), [])
    def test_refuse_unlisted_removal(self):
        with self.assertRaises(ValueError):plan({'a':'1'}, {'a':'1','b':'2'}, {'a':'1','b':'2'}, {'c'})
    def test_refuse_drifted_removal(self):
        with self.assertRaises(ValueError):plan({'a':'1'}, {'a':'1','b':'2'}, {'a':'1','b':'9'}, {'b'})
    def test_reject_path_escape(self):
        for name in ['../secret','/secret','a\\b','a\nb']:
            with self.assertRaises(ValueError):safe_path(name)

class TransactionTests(unittest.TestCase):
    def test_failed_public_verification_restores_switched_files(self):
        import deploy
        import io
        import json
        import os
        import tempfile
        from pathlib import Path
        from unittest.mock import patch
        from build import digest
        root = '/domains/qdnco.com/public_html'
        old = b'old page'; new = b'new page'
        store = {root+'/index.html':old, root+'/dubai/index.html':old}
        class FTP:
            def rename(self, source, target):store[target]=store.pop(source)
            def delete(self, path):del store[path]
            def quit(self):pass
        def read(_ftp,path,optional=False):
            if optional:return store.get(path)
            return store[path]
        def write(_ftp,path,data):store[path]=data
        prior_cwd=os.getcwd()
        with tempfile.TemporaryDirectory() as tmp:
            try:
                os.chdir(tmp)
                Path('release/dubai').mkdir(parents=True)
                Path('ci').mkdir()
                for name in ['index.html','dubai/index.html']:(Path('release')/name).write_bytes(new)
                desired={n:digest(new) for n in ['index.html','dubai/index.html']}
                previous={n:digest(old) for n in desired}
                Path('release-manifest.json').write_text(json.dumps(desired))
                Path('ci/production-baseline.json').write_text(json.dumps(previous))
                with patch.dict(os.environ, {'FTP_REMOTE':root,'GITHUB_SHA':'abc','GITHUB_RUN_ATTEMPT':'1'}), patch.object(deploy,'validate',return_value=desired), patch.object(deploy,'connect',return_value=FTP()), patch.object(deploy,'get',side_effect=read), patch.object(deploy,'put_verified',side_effect=write), patch.object(deploy,'mkdirs'), patch.object(deploy.urllib.request,'urlopen',return_value=io.BytesIO(b'wrong public response')), patch.object(deploy.sys,'argv',['deploy.py']):
                    with self.assertRaisesRegex(ValueError,'Public HTTP verification failed'):deploy.main()
                self.assertEqual(store[root+'/index.html'],old)
                self.assertEqual(store[root+'/dubai/index.html'],old)
                self.assertNotIn('/domains/qdnco.com/.qdnco-deploy-state.json',store)
            finally:os.chdir(prior_cwd)
