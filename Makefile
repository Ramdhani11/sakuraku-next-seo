send-test:
	rm -rf out && npm run build && scp -i ../../id_rsa -r out anwar@sakuraku.id:/var/www/test.sakuraku.id/
