cd ../P2
pip install pipenv
pipenv install
source "$(pipenv --venv)/bin/activate"
/bin/bash gendata.sh

cd ../P3
corepack enable
yarn

