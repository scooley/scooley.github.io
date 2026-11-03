---
layout: single
title: "Experiments"
permalink: /projects/
author_profile: true
---

I like tools that help people think, build, and learn. These are a few projects I've helped shape, along with the questions that keep me working on them.

## Clarity Agent

What if an AI assistant helped you question the plan before it started building?

I helped start [Clarity Agent](https://github.com/microsoft/clarity-agent) as a hackathon project and take it through to an open-source release. It asks about stakeholders, assumptions, and failure modes, and keeps that thinking in documents alongside the code.

The part I'm still working through is the loop between planning and building: how do we keep the decisions connected to what actually gets made?

{% assign clarity_post = site.posts | where: "slug", "building-ai-that-makes-you-wiser" | first %}
{% if clarity_post %}
[Read what I love about Clarity, and what still needs work]({{ clarity_post.url | relative_url }}).
{% endif %}

## AI safety tools

I've contributed to [RAMPART](https://github.com/microsoft/RAMPART) and [PyRIT](https://github.com/microsoft/PyRIT), and worked on how tools like these fit into the development process.

I'm especially interested in AI memory: how information becomes a lasting interpretation, and how that interpretation shapes what an agent does next.

{% assign memory_post = site.posts | where: "slug", "read-only-is-not-influence-free" | first %}
{% if memory_post %}
[Read "Read-only is not influence-free"]({{ memory_post.url | relative_url }}).
{% endif %}

## Making things away from a keyboard

Not every project is software. I also [knit quite a lot]({{ '/knitting/' | relative_url }}).

For the longer professional story, visit [My work]({{ '/resume/' | relative_url }}).
