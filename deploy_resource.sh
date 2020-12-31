# resource server start

echo "git pull.."
git pull

cd ~/DSM_Auth_Backend/PublicAPI/

echo "stop server"
npm stop

echo "build typescirpt"
npx tsc

echo "server start"
npm run start:prod
