---
layout: archive
title: "Tech Blog"
permalink: /blog/
author_profile: true
---

Thoughts on software development, AI, and building useful tools.

{% for post in site.posts %}
  {% include archive-single.html type="list" %}
{% else %}
  No posts yet.
{% endfor %}
