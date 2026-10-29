---
name: add-sensor
description: Use when adding or changing a Home Assistant sensor (voltalis_*) exposed by the bridge.
---

# Ajouter un capteur HA

Test d'abord (skill `tdd-workflow`), puis :

1. Déclarer le capteur dans `src/sensors.ts` via `hass.registerSensor("voltalis_<nom>", { friendly_name, icon, unit_of_measurement, device_class, state_class })`. Énergie cumulée : `device_class: "energy"`, `state_class: "total_increasing"`, unité `Wh`.
2. Alimenter `update({ state })` depuis le poller concerné dans `src/index.ts` (un bloc `error:` qui ne logge que `e.message`).
3. Capteurs dynamiques (par appareil) : id `voltalis_<id>_wh`, cf. `index.ts`.
4. Test : en mode dev (`isProd=false`) l'état reste en mémoire ; en prod, `POST states/sensor.<nom>` (voir `sensor.test.ts`).
   Un échec HA ne doit jamais faire tomber les pollers (Sensor renvoie l'erreur au lieu de la lancer).
