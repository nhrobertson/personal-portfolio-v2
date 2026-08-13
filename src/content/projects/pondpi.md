---
title: "PondPi"
status: "archived"
dateStart: "2024"
dateEnd: "2024"
stack: ["Raspberry Pi Pico W 2", "MicroPython", "SSR"]
summary: "The first attempt, after graduation, at a pond control system for a backyard pond — superseded by ESPond32."
github: "https://github.com/nhrobertson"
order: 4
---

A "duct tape and nails" project which used a Raspberry Pi Pico W 2 for LAN control and scheduling of pumps and a water valve. Developed in MicroPython using Thonny and flashed over USB to the Pico W board. Power came from a USB supply with mains powering a wall outlet inside the system box; pumps and valve were switched via SSRs from GPIO output pins.

Basic functionality worked well but lacked stability and efficiency — which led directly to ESPond32.
