---
title: "Read-only is not influence-free"
date: 2026-10-30
categories: [tech]
tags: [ai, security, memory]
toc: true
toc_sticky: true
excerpt: "Read-only access limits what an agent can change. It doesn't settle how the information it reads should influence its answers, inferences, or memory."
---

I just got back from [[un]prompted II](https://unpromptedcon.org/agenda-10-2026/) which is becoming a new favorite.  This instance had many talks and workshops about constraining what agents can do by (primarily) limiting auth and tool calls but I left thinking about a different boundary: what is allowed to enter the agent's context window and what can the agent save into notes?

Making access read-only limits what an agent can modify but it doesn't prevent the information it reads from shaping what the agent emphasizes, summarizes, or infers.  Reading a document should inform an answer, not redefine the task. But preserving that distinction gets harder when the agent turns what it reads into a summary, or remembers its interpretation for later.

I've been working on AI memory safety. Two public pieces I worked on, [Manage AI memory safety in agentic systems](https://learn.microsoft.com/en-us/security/zero-trust/sfi/manage-agentic-memory-safety) and [Guarding AI memory](https://www.microsoft.com/en-us/security/blog/2026/06/22/guarding-ai-memory/), describe why memory needs security controls across its lifecycle. The question I want to explore here starts before anything is saved: how should information entering an agent's context influence its behavior?

**Read-only is a permission boundary. It is not a guarantee that the information being read won't steer the agent.**

## Reading is supposed to change the answer

We give agents access to information because we want it to influence their responses. An assistant that reads a project's design documents should produce a different answer from one that hasn't. That's the point.

The difficult question is *how* that information should influence the answer.

A retrieved document might contain a fact, a proposal, a joke, an outdated decision, or instructions intended for someone else. The person asking for a summary may be authorized to read all of it. That doesn't make every statement equally trustworthy, current, or relevant. And it doesn't make the document's author someone who should be able to direct the assistant.

## From "I can't attend" to "I dislike meetings"

Consider a hypothetical example. You tell a coworker, "I can't make this meeting." An assistant summarizing the conversation records that you prefer not to attend these meetings.

That's a small change in wording and a substantial change in meaning. A constraint on one afternoon has become a general preference.

If that interpretation becomes memory, future recommendations might suggest skipping similar meetings or favor asynchronous updates. The assistant is now personalizing its answers around a preference you never expressed.

The transition is from *something you said* to *something the assistant believes about you*.

No attacker is required. Selection, emphasis, and omission are already consequential. Someone discussing a sensitive topic isn't necessarily disclosing that topic as a fact about themselves, either. Being allowed to read something is not blanket permission to turn it into a personal inference.

This isn't an argument against summarization or inference. Both are useful. It's an argument for evaluating what the agent concludes, not assuming safety follows from the absence of write access to the source.

## Memory carries the interpretation forward

Context and persistent memory aren't the same thing. Information in the current context can affect this response without being retained for another session. Neither requires changing the model's underlying weights.

Memory adds another step: some information, or the agent's interpretation of it, is saved and later brought back into context.

The [Microsoft Learn guidance](https://learn.microsoft.com/en-us/security/zero-trust/sfi/manage-agentic-memory-safety) makes a distinction I find especially useful: memory is both valuable data and a control plane. It holds information worth protecting, but it also influences future reasoning and tool selection. Protecting the storage is necessary; it doesn't settle whether the contents should guide a future answer.

That matters even without an attacker. A tentative inference can become a memory, lose its original qualifications, and return later looking like an established fact.

Consider this hypothetical progression:

1. A conversation says a team used a workaround during an incident.
2. A summary drops the incident-specific context.
3. A memory records the workaround as the team's preferred approach.
4. A later recommendation treats that memory as standing guidance.

Each step can make the original statement look more authoritative than it was. The later answer may be consistent with the memory while no longer being faithful to the source.

A source connector being read-only doesn't prevent this if the assistant has a separate path for saving memory. Even without that path, the interpretation can still affect the current response.

## Persistence changes the timing of an attack

The [Guarding AI memory post](https://www.microsoft.com/en-us/security/blog/2026/06/22/guarding-ai-memory/) describes a hypothetical attack involving hidden instructions in a shared document and delayed effects in a later interaction. The important detail is the gap between encountering the content and acting on it.

That gap changes what we need to investigate. Looking only at the prompt immediately before a bad response or action may miss the source of the influence.

Indirect prompt injection, sometimes called cross-prompt injection or XPIA, makes the authority problem explicit: content the agent was supposed to examine attempts to tell it how to behave. An innocent misinterpretation and an intentional attack aren't the same failure, but both make it important to track how source material came to influence an answer.

## Guardrails help, but don't settle the interpretation problem

The security blog describes protections around memory creation, including checks for whether memory tool calls align with user intent, and audit events for memory updates. Those address two different questions: should this information become memory, and can we reconstruct what happened afterward?

The Learn guidance also calls for provenance, user controls to inspect and correct memory, and isolation enforced outside the model. Boundaries between users, agents, and tenants shouldn't depend on a model following a prompt.

But a memory doesn't become permanently trustworthy because it passed a check when it was written. It can become stale, be retrieved for the wrong purpose, or carry an interpretation that doesn't hold in the new context. Both sources emphasize evaluating memory again at retrieval time.

**Safe to store is not the same as appropriate to use here.**

These guardrails matter. But having them doesn't mean we've solved the distinction between evidence, instructions, opinions, and inferred preferences. A memory write can be authorized and still contain a poor interpretation.

## The open problem: preserving meaning through transformation

This is the part I want to keep investigating. How do we preserve those distinctions when a summary blends several sources together? If a memory combines an explicit statement with an inference, can a later agent tell which is which?

Provenance can tell us where information came from. But can it also preserve the qualifications that made a statement true? Knowing which conversation produced "prefers not to attend meetings" isn't enough if the conversation only established a scheduling conflict.

And how should we evaluate this? It isn't enough to check whether the agent blocked a bad tool call. We also need to ask whether a summary preserved uncertainty, whether a preference was actually expressed, and whether a remembered conclusion is appropriate in a new situation.

I still want least-privilege access, sandboxing, and strong controls on tool execution. I also want assistants that can use context and remember useful things.

But alongside "Can this agent take an inappropriate action?" I want us to ask, "Can we recognize an inappropriate interpretation before it becomes the basis for an answer or a future memory?"

Reading a document should inform an answer, not redefine the task. Preserving that distinction as information becomes summaries, inferences, and memory is the harder problem.
