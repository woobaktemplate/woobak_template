#! /bin/bash

### SERVER DEPLOY AUTOMATION PART 2 ###

# STEP 1: clone github code onto server
rm -r /home/
cd /home/woobak
git clone https://github.com/woobaktemplate/woobak_template.git
mkdir woobak
mv woobak_template/* woobak
rm -r woobak_template

# STEP 2: create virtual environment for python 3
mkvirtualenv woobak
