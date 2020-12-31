# autorizatoin server stat

echo "git pull.."
git pull

cd ~/DSM_Auth_Backend/Authorization/

echo "stop server"
npm stop

echo "build typescript"
npx tsc

echo "server start"
npm run start:prod
