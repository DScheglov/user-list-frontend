PROJECT := dsch-user-list-front
IMAGE := dscheglov/user-list-front
PORT_MAP := 88:8080

drop:
	docker rm -f $(PROJECT)

clean: drop
	docker rmi -f $(IMAGE)

build:
	docker build -t $(IMAGE) .

run:
	docker run -d --name=$(PROJECT) -p $(PORT_MAP) $(IMAGE)

up: build run
