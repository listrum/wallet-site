# Wallet | History | Key storage | Node connect

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
