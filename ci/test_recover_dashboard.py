import copy
import unittest
from recover_dashboard import check


class RecoveryTest(unittest.TestCase):
    def setUp(self):
        self.e = {'previous_commit':'old', 'previous':{'index.html':'oldhash'}, 'desired':{'index.html':'newhash'}}
        self.s = {'commit':'old', 'files':self.e['previous']}

    def test_exact_evidenced_transition(self):
        check(self.e, self.s, self.s, self.e['desired'], self.e['desired'])

    def test_refuses_state_backup_artifact_and_live_drift(self):
        for index in range(4):
            args = [copy.deepcopy(self.s),copy.deepcopy(self.s),copy.deepcopy(self.e['desired']),copy.deepcopy(self.e['desired'])]
            args[index]['unexpected'] = 'edit'
            with self.subTest(index=index), self.assertRaises(ValueError):
                check(self.e, *args)

    def test_refuses_already_recovered_state(self):
        with self.assertRaises(ValueError):
            check(self.e, {'commit':'new','files':self.e['desired']},self.s,self.e['desired'],self.e['desired'])
