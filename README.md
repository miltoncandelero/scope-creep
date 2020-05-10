# Scope Creep
[*play now*](https://miltoncandelero.github.io/scope-creep/)  
Play a game where you are the external producer and keep adding new features that introduce new bugs. Use those bugs to justify new features that introduce even more bugs!

**This is a game made in React, in one weekend WITHOUT ANY PREVIOUS KNOWLEDGE of React or any other frontend web development framework**  
You should not take this as a good way to do anything. This is me, picking a technology I never used and doing something in a weekend.  
I suck at designing and suck even harder at CSS ~~and this doesn't look thaaaat bad~~  
Take this as a testament that you can pick whatever technology you want and get good at it.  
As a wise dog once say:
> *“Dude, suckin' at something is the first step to being sorta good at something.”*

---

### Enough Disclaimer, now the features:

- Random repo name generator and random username generator (based on [foswig](https://github.com/mrsharpoblunto/foswig.js/) and the [100 most commiting people on github](git.io/top))
- Random feature generator by matching words that end in *"-ify"* with buzzwords.
- Big numbers provided by [break_infinity](https://github.com/Patashu/break_infinity.js)
- UI via [Blueprintjs](https://blueprintjs.com/)
- Your games saves automagically and also has a button to nuke it.
- If a feature reaches 5 merges you can add a new feature.
- Every 10 merges you get a global 1% boost
- There is no endgame nor prestige thingies. I made this as a tinkering exercise.

---

#### Final take:
If you never handled something stateful or frontend development you need to flip your entire head. You can't have the UI just "follow along" your data. Your data has to follow your UI. Every single time you need to update data you do it via the UI provided method (in this case `setState`) so the ui knows it needs to show new data. 
