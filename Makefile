.PHONY: clean kill
all: clean

clean:
	rm -rf bun.lockb
	bun install

kill:
	killall -9 workerd
