import json
from pathlib import Path
import tempfile
import unittest
from dashboard import ALLOWED, validate

class DashboardGuards(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        for name in ALLOWED:
            (self.root/name).write_text('{}' if name.endswith('.json') else 'Public dashboard')
        self.state([{'id':'one','status':'Waiting'}])
    def tearDown(self):self.temp.cleanup()
    def state(self,tasks):(self.root/'status.json').write_text(json.dumps({'tasks':tasks}))
    def test_valid(self):self.assertEqual(set(validate(self.root)),ALLOWED)
    def test_extra_path(self):
        (self.root/'index.php').write_text('bad')
        with self.assertRaises(ValueError):validate(self.root)
    def test_symlink(self):
        (self.root/'index.html').unlink();(self.root/'index.html').symlink_to('/etc/passwd')
        with self.assertRaises(ValueError):validate(self.root)
    def test_private_path(self):
        (self.root/'index.html').write_text('/Users/private/lead-list')
        with self.assertRaises(ValueError):validate(self.root)
    def test_duplicate_ids(self):
        self.state([{'id':'one','status':'Waiting'}]*2)
        with self.assertRaises(ValueError):validate(self.root)
    def test_unknown_status(self):
        self.state([{'id':'one','status':'Published maybe'}])
        with self.assertRaises(ValueError):validate(self.root)
