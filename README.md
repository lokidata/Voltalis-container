<div id="top"></div>

# Voltalis Bridge (Container Version)

This project is a fork of [zaosoula/ha-addons](https://github.com/zaosoula/ha-addons).

**This version allows you to run Voltalis Bridge as a standalone container, instead of a Home Assistant add-on.**

The bridge can be used to monitor consumption and enable/disable devices from Voltalis in your Home Assistant setup.

## Usage as a Container

### Build the Docker image

```sh
docker build -f Dockerfile.container -t voltalis-bridge .
```

### Run the container

You must provide the following environment variables:

- `VOLTALIS_USERNAME`: Your Voltalis account username
- `VOLTALIS_PASSWORD`: Your Voltalis account password
- `HA_URL`: The base URL of your Home Assistant instance (e.g. `http://192.168.1.100:8123`)
- `HA_TOKEN`: A Home Assistant long-lived access token (see your user profile in Home Assistant)

Example:

```sh
docker run -d \
  -e VOLTALIS_USERNAME=your_username \
  -e VOLTALIS_PASSWORD=your_password \
  -e HA_URL=http://192.168.1.100:8123 \
  -e HA_TOKEN=your_long_lived_token \
  --name voltalis-bridge \
  voltalis-bridge
```

## Notes

- This container does not require Home Assistant Supervisor.
- The `HA_URL` can be provided with or without `/api` at the end; the bridge will handle it automatically.
- Make sure your Home Assistant token has API access rights.

---

## Acknowledgments

* [zaosoula/ha-addons](https://github.com/zaosoula/ha-addons) (original project)
* [Ring-bridge by Helmut Hoffer von Ankershoffen](https://github.com/helmut-hoffer-von-ankershoffen/hassio-ring-bridge)
* [Hassion-addons by Kris De Winter](https://github.com/kdw2060/hassio-addons)
* [Voltalis-cli by Ivo Bellin Salarin](https://github.com/nilleb/voltalis-cli)

<p align="right">(<a href="#top">back to top</a>)</p>
