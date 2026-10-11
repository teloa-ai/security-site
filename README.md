# Teloa AI Security

<img src="assets/teloa-security.webp" width="200" alt="Teloa, security engineer">

**English** · [简体中文](README.zh-CN.md)

Teloa AI Security is an AI security research and open-source initiative rooted in Teloa development. It focuses on agent identity, authorization, execution boundaries, and security governance, turning design experience into an open baseline, reference architectures, and assessment tools.

Public security site: [security.teloa.ai](https://security.teloa.ai/)

[Teloa website](https://www.teloa.ai/en/) · [Docs](https://docs.teloa.ai/en/) · [Marketplace](https://market.teloa.ai/en/) · [Blog](https://www.teloa.ai/en/blog/) · [Security reports](https://security.teloa.ai/report/?lang=en)

Initiated and maintained by Teloa AI Security.

## Open projects

- [Agent security baseline assessment](https://security.teloa.ai/agent-baseline-assessor/?lang=en)
- [Multilingual reference architectures](https://security.teloa.ai/agent-baseline-assessor/01-standard/diagrams/?lang=en)
- [Project repository and documentation](https://github.com/teloa-ai/agent-baseline-assessor)

## Deployment

This independent repository publishes the public security portal to Cloudflare Pages at `security.teloa.ai`. The organization-level `teloa-ai.github.io` repository remains available for the organization homepage and shared resources.

The site uses static HTML and local scripts for bilingual content and shared navigation, with Cloudflare Web Analytics for aggregated visits and performance. The assessment demo keeps responses and evidence in the browser; it does not send assessment content to analytics. Its request traffic can be inspected in Cloudflare's server-side analytics. English is the default; `?lang=zh-CN` selects Simplified Chinese.

The baseline is an independent, self-hostable [project](https://github.com/teloa-ai/agent-baseline-assessor). This portal hosts only its demo at `/agent-baseline-assessor/`. The build retrieves the public revision pinned in `demo-project.json`; it does not add portal navigation or dependencies to the tool or architecture gallery.

With Node.js 22+ and Git installed, run `npm test` to assemble and check `dist/`. Maintainers can deploy with `npm run deploy` after authenticating the Cloudflare CLI. No credentials belong in this repository. Update the pinned revision explicitly when publishing a reviewed project release.

If automatic Cloudflare Web Analytics injection is enabled, exclude `/agent-baseline-assessor/` with a hostname-and-path configuration rule. Portal analytics remain enabled; the independent demo retains its `connect-src 'none'` policy.

Report security issues via [security@teloa.ai](mailto:security@teloa.ai) and follow the [project-specific guidance](https://security.teloa.ai/report/?lang=en). Machine-readable contact information is available at [security.txt](https://security.teloa.ai/.well-known/security.txt).

See [brand assets](assets/README.md) for the rights associated with the brand and squirrel artwork.

Portal code is licensed under Apache-2.0. Brand assets have separate terms; the demo retains its project's software and documentation licenses.
