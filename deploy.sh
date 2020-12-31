cd ~/DSM_Auth_Backend/
git pull

# autorizatoin server stat 

cd ~/DSM_Auth_Backend/Authorization/

echo "stop server"
npm stop

echo "build typescript"
npx tsc 

echo "server start"
npm run start:prod

# resource server start 

cd ~/DSM_Auth_Backend/PublicAPI/

echo "stop server"
npm stop

echo "build typescirpt"
npx tsc

echo "server start"
npm run start:prod