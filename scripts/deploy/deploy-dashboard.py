#!/usr/bin/env python3
"""Scoped dashboard publisher. Reuses production release/TLS guards; never uploads other routes."""
import ftplib,io,os
from pathlib import Path
import deploy
os.chdir(Path(__file__).resolve().parents[2])
rel,hist=deploy.release_guards()
if not deploy.SECURE: raise SystemExit('FTPS required')
allowed={'index.html','status.json','diagnostic-script.txt','prospect-scorecard.json','operating-playbook.json','content-experiments.json'}
root=Path('dist/growth-status')
if {p.name for p in root.iterdir() if p.is_file()}!=allowed:raise SystemExit('Unexpected dashboard files; inspect before publish')
ftp=ftplib.FTP_TLS(context=deploy.tls_context());ftp.connect(deploy.HOST,21,timeout=30);ftp.auth();deploy.check_peer_is_hostinger(ftp.sock);ftp.login(deploy.USER,deploy.PASSWORD);ftp.prot_p()
if deploy.GUARD in ftp.nlst(deploy.REMOTE):raise SystemExit('Remote root guard present')
remote=deploy.REMOTE+'/growth-status'
try:ftp.mkd(remote)
except ftplib.error_perm as e:
 if not str(e).startswith('550'):raise
for name in sorted(allowed,key=lambda x:x=='index.html'):
 data=(root/name).read_bytes();dest=remote+'/'+name;tmp=dest+'.uploading'
 ftp.storbinary('STOR '+tmp,io.BytesIO(data));check=io.BytesIO();ftp.retrbinary('RETR '+tmp,check.write)
 if check.getvalue()!=data:raise SystemExit('Upload hash mismatch: '+name)
 ftp.rename(tmp,dest);print('Uploaded and byte-verified',name)
ftp.quit();deploy.record_deploy(rel,hist)
print('Published only /growth-status/. Public HTTP verification remains required.')
