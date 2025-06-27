#!/data/data/com.termux/files/usr/bin/bash
git add .
echo "Masukkan pesan commit:"
read pesan
git commit -m "$pesan"
git push
