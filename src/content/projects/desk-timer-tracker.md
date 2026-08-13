---
title: "Desk Timer Tracker"
status: "complete"
dateStart: "2025"
stack: ["STM32C0116-DK", "Micro OLED", "PIR sensor"]
summary: "An exploration of the STM32 development space — firmware that tracks how long a user sits at their desk and nudges them to get up."
github: "https://github.com/nhrobertson/desk-timer-tracker/"
order: 3
---

Functioning firmware for a STM32C0116-DK — one of the smallest microcontrollers around — paired with a micro OLED and a PIR sensor to track desk sitting time. A basic on-device UI lets the user set thresholds; once a calculated timer threshold passes, a GPIO signal fires to encourage movement away from the desk.

The original design called for an mmWave sensor, but after ordering one from an obscure website and finding the breakout board didn't work, a PIR sensor was used instead due to availability. Custom hardware was planned but scrapped due to poor parts resourcing.
