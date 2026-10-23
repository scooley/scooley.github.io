---
layout: single
title: "The parts of Clarity Agent I love (and the part that is broken)"
date: 2026-10-22
tags: [ai, product, tools]
---

I've been working on [Clarity Agent](https://github.com/microsoft/clarity-agent) for just under a year, and I still haven't figured out how to feel about it. I helped start the hackathon project and take it from an internal experiment to an open-source release. I *want* something like Clarity Agent in my toolchain. At the same time, I don't think we got it right.

I love what it could be but have a mixed relationship with what it *is*, which feels more worth writing about than another "here's a cool AI tool" post.

## The thing I love most: it asks good questions

Most AI tools are trained to be helpful, and "helpful" usually means agreeable. You describe an idea and a coding agent starts executing. The question of whether you're building the right thing never comes up.

Clarity's whole premise is the opposite. It's annoying in the right way.

I've had it stop me mid-plan and ask who the actual stakeholder is, or whether the thing I called a requirement is actually an assumption. Questions I should have asked myself and that a perceptive coworker would ask in a meeting or spec review.  Working with Clarity's chat interface is also genuinely fun. It's more collaborative for ideation than writing planning docs alone or with a more neutral agent, while still producing planning content I'd share with other humans.

I really like [this blog post](https://medium.com/@yonatanzunger/are-we-building-the-right-ai-203cfc7effdc) by [Yonatan Zunger](https://medium.com/@yonatanzunger), the brain behind Clarity Agent. Clarity delivers on the idea of asking the right questions.

## The failure analysis is genuinely good

Part of why Clarity is so good at asking questions is that it's good at failure analysis. The best questions come from skepticism, which requires considering several perspectives: What does a malicious person do with this? Where does a well-intentioned user make a mistake? What does the security checklist say? One AI trying to think about all of those at once tends to produce a generic list that looks thorough but isn't.

Clarity's approach is to run independent specialists. A general thinker goes first ("analyze this as it will actually be used"). Then come the specialists:

- A security thinker that works through auth, data protection, and injection risks against actual threat actors from your stakeholder list.
- A human factors thinker whose explicit premise is that "user error is never a root cause, it's always a symptom of a design problem."
- An adversarial analysis thinker that inventories your system's capabilities and asks who would want it to fail and what they'd specifically do.

Each works independently and drops results into its own mailbox. Then Clarity synthesizes the failures by discarding ones that wouldn't cause real harm, deduplicating across thinkers, grouping by underlying mechanism, and surfacing the ones that need a human in the loop to resolve.

Because Clarity Agent knows what problem you're solving, its failure analysis is grounded in your problem space. Knowing the failure modes doesn't resolve them, but it helps prioritize which problems to solve and shape the product's direction. I find that other approaches to failure analysis focus on technical gaps rather than the strategic or structural issues that need to be considered when defining the product.

For example, if I were building a forum with user accounts, almost any coding harness would call out storing unencrypted user passwords as a risk and help integrate with OAuth.  Clarity agent would consider the nature of the content (is content likely to be explicit or contain PII?) or interaction details (can people send DMs?) and highlight risks related to that as well.  Clarity Agent would highlight things like malicious users filling the forum with SPAM as a failure mode and help talk through options for community management.

## The documentation is useful product thinking

Everything Clarity produces lives in a `.clarity-protocol/` directory — human-readable markdown, in your repo, version-controlled alongside your code. Your future self can read it. Your teammates can read it. Agents can read it.

What makes it more than a notes folder is the dependency graph. Each document records a hash of its dependencies at the time you last reviewed it. When the problem statement changes, Clarity knows the solution description might now be wrong and flags it.

In practice, this catches the invisible drift that happens when you're deep in a project and update one thing without remembering what depended on it. The document that "looks authoritative but isn't" is a failure mode, and this is the only mechanism I've seen that actually addresses it at the source rather than in a retrospective.

## The part that's broken: the plan <-> build loop

Here's the deeper problem. Clarity Agent is, conceptually, built around the idea that creativity is iterative. You'll plan → build → replan → build in loops until the thing is actually right. Clarity Agent can help you iterate on the plan, but moving between planning and development doesn't work well.

**In the MCP/embedded version**, Clarity can run alongside your coding agent via MCP. The idea is that your agent can check the protocol, keep it updated as the code evolves, and flag changes that drift from the original intent. In practice, it doesn't do this reliably. Coding agents don't reliably know when to update the protocol. When staging a change, they don't seem to consider whether it aligns with the product's intent before committing to a direction.

**In the app/web version**, I've had Clarity Agent start writing code mid-session without the guardrails I'd expect from a dev environment. The next logical step in the sequence was implementation, and it just went there. That's a hard failure mode for a tool built around careful, structured thinking.

The result in both cases is that the protocol can become a one-time artifact rather than a living one.

## Where this leaves me

I'm not ready to give up on Clarity Agent's premise, and this feels solvable. Clarity already tracks dependencies between planning documents. That answers: “We changed the problem statement. Which decisions might now be stale?”

The development loop needs the inverse: “We changed the implementation. Does that invalidate a requirement, assumption, or decision?” If the code changes but the documents don’t, the planning graph can remain internally consistent while becoming wrong about reality.

For example, suppose the plan says that a feature stores data locally. During implementation, the coding agent discovers that collaboration requires a hosted service. A PR check could catch the mismatch after the fact, but what I really want is to catch it while I’m building, resolve the decision, and keep going without losing the thread.

That probably means finding a harness where coding agents treat the Clarity protocol as a constraint — something automation checks against before committing. When the implementation diverges from the plan, I want it to surface the mismatch so we can decide whether the plan needs to change or the code needs to be corrected. Something that triggers the question, "Wait, does this change the problem?"

If this problem is interesting to you, reach out. I would love to hear your ideas. Clarity Agent is open source, try it out yourself via [Clarity Agent on GitHub](https://github.com/microsoft/clarity-agent) and tell us what you think by joining the [Clarity Agent Discord community](https://aka.ms/clarity-agent-community).
