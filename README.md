# Wallet | [History](https://github.com/listrum/web#history) | [Key storage](https://github.com/listrum/web#key-storage) | [Node connect](https://github.com/listrum/web#node-connect)

## Networking

### Node connect
	HTTPS GET :2525/connect/YourAddress

	200 OK
	
### History
Storage at your home directory /listrum/history

	HTTPS GET :2525/history/WalletAddress

	200 OK [{"to": WalletAddress, "value": FloatValue}, ..]
	
### Key storage
Storage at your home directory /listrum/key_storage

#### Store your key
	HTTPS GET :2525/store/
	{
		"cash": Temp wallet,
		"key": Your key,
		"name": Name of your key
	}
	
	HTTPS 200 OK

#### Get your key
	HTTPS GET :2525/get/KeyName
	
	HTTPS 200 Key
