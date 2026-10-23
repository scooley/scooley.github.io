---
layout: archive
title: "Tech Blog"
permalink: /blog/
author_profile: true
---

Thoughts on software development, AI, and building useful tools. Browse by [tag](/tags/).

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
  <h2>{{ year.name }}</h2>
  {% for post in year.items %}
    {% include archive-single.html type="list" %}
  {% endfor %}
{% endfor %}
{% if site.posts.size == 0 %}
  No posts yet.
{% endif %}
