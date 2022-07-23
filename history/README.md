### Requirements:

- [Listrum](https://github.com/listrum/main):

		pip install listrum -U

### Storage:
At your home directory /listrum/history

### Networking:

#### Get history:

	HTTPS GET :2525/history/WalletAddress
	
	200 OK [{"to": WalletAddress, "value": FloatValue}, ..]
