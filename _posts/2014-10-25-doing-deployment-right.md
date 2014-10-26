---
layout: post
category : productivity
tagline: "Check it in and automate it"
tags : [deployment, containers, docker, advice]
summary: "*Everything* about your software should be in version control. The environment your software runs in should be built from scratch, regularly."
header_image: "ship-it-squirrel.png"
---

Poor deployment contributes to errors and slow down of feature delivery when teams are building software. I'm going to discuss some principles which enables teams to ship software regularly, with confidence whilst minimizing the
probability of deployment related errors.

<!--Programmers have different capabilities, some are better than others. I’ve worked with amazing people who can hold a lot of state in their head. They can model the entire -->
<!--production system in their mind, as if they’re part of the machine – good for them. But what we need is to engineer systems in a way that works for the lowest common denominator. -->
<!--For when these people go on holiday, or have a bad day, or its 4 am, or that system gets shipped off to another team. Amazing engineers need to use their smarts to make -->
<!--deployments easy enough that they could do it if their IQs all dropped by 40 points. When the model in people’s heads of how the production system works is slightly incorrect, -->
<!--that’s when a production error happens. -->

<!--There are bunch of principles talented engineers follow when they’re writing code in “enterprise”, “don’t break things” mode (not hacking). There are many books on these -->
<!--topics, personally I like [The Pragmatic Programmer](http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X). They include things like: Don’t Repeat Yourself (DRY), Don’t have state all over your program / Automate -->
<!--repetitive developer tasks (continuous builds, tests). These are broad rules of thumb which extend across all languages and platforms. General principles -->
<!--which help people write software which doesn’t fall apart in the long term.-->

<!--The longer I program I’ve realised there is a general principle I’m following that I’ve seen followed less regularly: Bundle everything describing your software with your software.-->

<!--Perhaps this seems obvious. I doubt many people would disagree with this rule of thumb. But I think when you get into specific examples people often don’t seem to do it.-->

##The rule of thumb

The rules are simple:

* Check in \*everything\* that describes your application and how it behaves. Not just the source code.
* Use \*everything\* to make sure your entire environment is rebuilt from scratch, every time you deploy.

I’m a big believer that this heuristic is going to allow you to: release you software frequently, with confidence and have less bugs / screw ups hitting production. 

##Step 1 – Check in \*everything\*

Most (sane) people store their code in version control. Nearly everyone manages to get all their code and some of their config in version control. 
It’s the things which miss the cut which I’m interested in here. The things that your app needs to run which aren’t checked in. 
Things like: That Nginx config that somebody modified on the production box, your software needs python to be installed, that 
10 command release procedure somebody does every release, etc.

###The Armageddon thought experiment

The way to track down \*everything\* about an application that isn’t checked in to version control, is to think: “If I just had the repo for the project, and a fresh account 
with your cloud provider (or a fresh host). What would I need to do to get my software running from scratch?”. What stuff would you be installing manually on that host 
from your brain. I think for a lot of apps this exercise is going to go quite badly. Which exact version of NodeJS were you using? What packages did you install on that Ubuntu host? 

This Armageddon exercise seems slightly over dramatic. You’re probably not going to lose your host and forget everything about your app overnight. 
But if you can get these things checked in you’ll be in a better position. In maybe an hour you could go away collect all this information and check 
it in as a .txt / .md file. That’s useful, during the Armageddon task above you’d be looking through those text files, you can do everything it says. 

##Step 2 - Automated and executed regularly

You don’t really want a bunch of documentation that tells you need to install some Linux packages and tweak that config file, set that environment variable etc. . 
The next step is obviously automation, it would be far more useful to have some scripts which just do the whole thing. Now after Armageddon you can smugly run your script.

There is a problem with having a one-off ‘install my software’ script, you’ll only run it once. So when an Armageddon event happens, it won’t work. Software (scripts included) only 
works if its being executed regularly. What we really need to do is fully automate the entire deployment so that it’s reproducible, the same thing happens when you do a 
release from v9 &#8594; v10 that happens when you’re recovering from Armageddon scenario. Executing regularly prevents the description of how to deploy your application falling 
out of sync with reality.

A good solution to this problem will:

* Work from scratch (on a brand new server).
* Be fully automated (no manual steps).

Full, reproducible automation sounds impossible. It’s pretty hard, but new technologies are pushing the boundaries of what is possible. 

<!--##Beyond deployment-->

<!--If I extend the idea of ”deployment” to normal operation of your software. Not just running it in production, but running it in UAT, continuous integration (builds, tests etc.), -->
<!--developers running it locally. If all of this information is checked in and executed regularly that is good. If developers develop in an environment which was -->
<!--setup the same as production, you’ll find bugs earlier, and you’ll get blindsided by issues less often during releases.-->

## Tools which help to make a reproducible execution environment

###Scripts

An old school classic, but most untracked state can be eliminated by scripts in the language / tool of your choice. You can script your deployment and run those scripts to deploy your software. It’s a pretty good start, and obviously they’re checked in.

###PaaS
PaaS helps solve this problem. For example [Heroku](https://www.heroku.com/) is amazing for developer productivity because it has strict rules about what you can and can’t do. And those rules pretty much mean that your deployments are automatic and reproducible. If I deleted your Heroku account with all your servers, you would be able to bring your software back in minutes (ok, so your database might be gone :s). PaaS limits what developers can do and makes deployment reproducible.  

###Virtual Machines

The best way to make sure everything works from scratch is to build an entire VM every time you deploy. It should contain the OS you’re using, the packages / other software you require and the latest build of your software you want to release. 
VMs are a very powerful tool, but they’re slow. Building one from scratch for every deploy hampers productivity. Like so many things, it’s a trade-off and the trade most (but not all) people make is not do this. Because shipping software quickly is also important. Tools like [Vagrant](https://www.vagrantup.com/) can help you to manage VMs.

###Chef, Puppet and Ansible

These three are all useful for getting hosts into a state where they can run your software. They allow you to treat server configuration as code. They’re flexible tools which enable management of large groups of servers, personally I think of them as more advanced tools for scripting.

###Containers
Containers are a tool which kind of look and feel like a VM. But critically doesn’t have as many overheads. They offer all the isolation and reproducibility that a VM does, you can build your entire OS and packages from scratch every time. But they do it quicker / use less disk space. The most popular and overwhelming player in this space is [Docker](https://www.docker.com/). Containers are a game changer for deployment, they allow tonnes more stuff to be pulled into version control that wasn’t possible before. 

##Follow the rule of thumb

So if in doubt: Step 1) Check ‘it’ in.  Step 2) Automate it and execute it regularly. If you follow this principle you won’t go too wrong with deployment. The tricky thing isn’t implementing steps 1) and 2). It’s identifying the things you need to check in and automate. This is hard, it involves thinking critically about your development processes to find all that state which your application relies on which isn’t checked in. 

It’s much easier to follow this principle at the beginning of a project. I think the cheapest way to follow this mantra is to use a decent PaaS, unfortunately for people in enterprise environments this isn’t always an option. If a PaaS isn’t flexible enough / you can’t use one then containers are the next best thing. Docker is still maturing and it’s just a building block which needs better tooling around it, but ultimately most PaaS will probably end up being implemented in Docker and then at that point, the two start to converge. 

These behaviours have tonnes of benefits. Version control shines at many things: auditability, code reviews and a living knowledge of why things happened. If you can see the code commits for when you upgraded from Java 7 &#8594; 8 it’s there forever, it’s a pull request for review and it’s completely reproducible from each developer’s environment all the way to production. This rule of thumb also lends itself to resiliency to host failures and scaling your software properly across many hosts. 

Deployment. Do it right :)

<br /><br />
Thanks go to [@jas_raj](https://twitter.com/jas_raj) for help with content and proof reading.