Use Docker to run it . 

command -> 

docker run -d -p PORT_NUMBER:80 --name CONTAINER_NAME nginx:alpine sh -c "apk add --no-cache git && git clone https://github.com/ensubahnurisit/tictactoe.git /tmp/tictactoe && cp -r /tmp/tictactoe/* /usr/share/nginx/html && nginx -g 'daemon off;'"

go to -> localhost:PORT_NUMBER

