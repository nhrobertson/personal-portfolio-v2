---
title: "ESPond32"
status: "active"
dateStart: "2026"
stack: ["ESP32", "FreeRTOS", "MQTT", "Mosquitto"]
summary: "The spiritual successor of the PondPi — an end-to-end control system IoT device operating 2 pumps, 1 water valve, and 1 light system."
github: "https://github.com/nhrobertson/ESPond32/"
order: 2
pinned: true
---

The firmware was developed by hand utilizing FreeRTOS's scheduling and queueing abilities. It uses MQTT to connect to a Mosquitto server hosted on a Raspberry Pi 3 which also hosts a "home-server." Operation is much more stable and efficient than the PondPi.

On top of the firmware, the ESPond32 has specialized hardware created for mounting in the control box: an LED strip, switch inputs, specific SSR outputs, and float sensor inputs.

Note: only the offboard-SSR hardware has been developed so far — the onboard-SSR variant may eventually get built.
