---
layout: post.html
title: "The Technology of Project Zeus"
author: "Bailey D'Amour"
description: 
    "Today's development update will go over the technology we are using to 
    develop the game."
date: 2025-02-10
tags: post
---

Happy Wednesday! I am Bailey, one of the programmers working on *Project Zeus*. 
Today's development update will go over the technology we are using to 
develop the game, covering many of the systems we have developed for the project. 

## Unreal Engine 5
We have decided to build our game in Unreal Engine 5 as it is the game engine 
that our team has the most experience with. Specifically, we wanted to leverage 
the engine's physics to create physics based puzzles and lighting systems to 
create our desired atmosphere for the game.

## Modular levels
After our first few iterations of building levels one thing became very clear: 
we wanted to iterate faster. To support our artists, our programming team has 
developed a modular snapping plugin that can parse through designated points 
in 3D models and allow them to snap together.

This approach to designing assets and levels has reduced the amount of 3D 
assets required to make levels and allowed level designers to block out new 
levels in just a few hours.

## Localization and accessibility
There is numerous accessibility features built into *Project Zeus*:
- Localization support for multiple languages, with English and French 
currently implemented.
- Colorblind vision filters
- Audio source direction visualization
- Subtitles for sound
- Configurable delay for repeated inputs
- Configurable input toggle/hold

## Power system
Much of the core gameplay loop revolves around maintenance of a derelict space 
station, specifically redirecting power to critical areas of the station. This 
provides the player with various puzzles related to power distribution and 
maintenance.

To allow our team of level designers to create power related puzzles. We have 
extended Unreal Engine with a custom power system. This system provides other 
developers with an easy-to-use interface for creating objects that can hook 
into a power network and respond to changes in power state, and provides level 
designers with the tools for linking these objects together.

The power system functions as a directed graph with cycle detection to prevent 
virtual short circuits. Each object integrated into the power network has a 
power node which can connect to any number of output power nodes. Power nodes 
can be set to emit power or become disconnected, preventing the node from 
propagating power through the network. When a power node changes state, 
updates are propagated through the network using a breadth first search.

Power nodes can also be set to operate as logic gates, evaluating the states 
of their input power nodes when deciding how to propagate state changes 
through the network. The following logic gates are supported:
- NOT
- OR
- AND
- XOR
- NOR
- NAND
- XNOR

Each individual network in the power system is visualized in the Unreal Engine 
editor, allowing level designers to quickly see the states of each power node 
and the connections between each node.

And yes, this system is Turing complete.

## Object pooling
Custom object pooling was implemented for certain objects that have a tendency 
be created and deleted often during gameplay, particularly for many of the 
environmental effects like surface decals. This was done to recycle game objects 
instead of performing the more costly operations of spawning and destroying 
these objects.

New object pools can be easily created by developers through an object pool 
manager.

## Inventory
Inspired by *Tetris* and *Escape from Tarkov*, inventory is another unique 
system in *Project Zeus*. The player's inventory functions as a grid where 
items, each with different layouts, can be placed, moved, and rotated.

Functionally, the inventory grid is defined as a 2D matrix of pointers to item 
objects. Each item has a 2D matrix that defines its layout which is used to 
generate all 4 possible rotated layouts of the item.

## Gravity
One limitation of Unreal Engine is that gravity can only act as a downwards 
force in the game world. To overcome this limitation, we have extended Unreal 
Engine's physics volumes to support applying a gravity force in any direction.

There is also a radial version of the gravity volume that applies the gravity 
force vector relative to the origin of volume instead of relative to world 
space. This volume can be used to pull, push, and have objects orbit relative 
to a specific point in the world.

## Minigames
The minigame system is a lightweight framework built on Unreal Engine's 
*Paper 2D* plugin. This system defines a plane in 3D space, creates a 
(-1,-1) to (1,1) coordinate system, and manages 2D sprite objects for creating
minigames that can be interacted with in the 3D game world.

The minigame system also handles camera translation and control input context
switching when the player interacts with a minigame. Minigames can be rotated 
in any directions and gameplay will transition seamlessly when entering and 
exiting minigames.

From simple use cases like close up inspections of posters, to more complex 
use cases like Minesweeper and the Wireworks puzzle game.

### Wireworks (yeah I sure hope it does)
Wireworks is a minigame that requires the player to arrange a series different 
wire pieces (straight, curved, T-junction, and cross-junction) to connect input 
wires to output wires. This minigame hooks into the power system to allow 
players to re-route power and repair discontinuities in the power network.

Wireworks puzzles are validated by performing a breadth first search from each 
input piece to check which output pieces can be reached.

### Minesweeper
Yes, we added a Minesweeper minigame. Don't blow up.

## Diagetic UI
To encourage the player to interact with the world and limit the amount of user 
interface elements in the game, we have opted to incorporate as much diagetic 
UI into our design as possible. The player character's health, status, and 
loaded ammunition is displayed directly on their back and the inventory and 
quest log screens are holographic projections shown directly in the game world.

## Interaction
There are a lot of interactable objects in *Project Zeus*. This includes doors, 
item pickups, minigames, power switches, and elevators to name a few examples. 
All the interactable objects share the same common system for dislaying input 
prompts, interaction icons, and handling interaction events.

## Grappling hook
The player can acquire a grappling hook during gameplay that allows lighter 
physics objects to be pulled around. This system is used for a few puzzles in 
the game.
