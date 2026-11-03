---
layout: archive
title: "Writing"
permalink: /blog/
author_profile: true
---

Things I'm thinking through: How AI is changing our lives.  How can AI show up as a co-creator by asking better questions and teaching effectively? If AI is natural language programming, how do tools need to change?  Plus how do I show up as a good leader.

Browse by [topic]({{ '/tags/' | relative_url }}) or [category]({{ '/categories/' | relative_url }}), or follow along with the [RSS feed]({{ '/feed.xml' | relative_url }}).

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
