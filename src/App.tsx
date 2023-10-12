import { Accordion } from "@patternfly/elements/react/pf-accordion/pf-accordion.js"
import { AccordionHeader } from "@patternfly/elements/react/pf-accordion/pf-accordion-header.js"
import { AccordionPanel } from "@patternfly/elements/react/pf-accordion/pf-accordion-panel.js"
import { Popover } from "@patternfly/elements/react/pf-popover/pf-popover.js"
import { Button } from "@patternfly/elements/react/pf-button/pf-button.js"
import { PfIcon } from "@patternfly/elements/pf-icon/pf-icon.js"
import { Timestamp } from "@patternfly/elements/react/pf-timestamp/pf-timestamp.js"
import { Table, Thead, Tbody, Th, Tr, Td } from "@patternfly/react-table"
import "@rhds/elements/rh-alert/rh-alert"
import "@rhds/elements/rh-card/rh-card"
import "@rhds/elements/rh-badge/rh-badge"
import "@patternfly/react-core/dist/styles/base-no-reset.css"
import "./App.css"
import { useState, Fragment } from "react"

PfIcon.getIconUrl = (set, icon) => `@patternfly/icons/${set}/${icon}.js`;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ['rh-alert']: unknown;
      ['rh-card']: unknown;
      ['rh-badge']: unknown;
    }
  }
}

const _cveData = {
  name: "CVE-2023-3777",
  published: 1694023537,
  lastModified: 1695842686,
  description: `A use-after-free flaw was found in the Linux kernel's netfilter: nf_tables component, which can be exploited to achieve local privilege escalation. When nf_tables_delrule() is flushing table rules, it is not checked whether the chain is bound, and the chain's owner rule can release the objects in certain circumstances.`,
  mitigation: `<p>Mitigation for this issue is to skip loading the affected module &quot;netfilter&quot; onto the system till we have a fix available, this can be done by a blacklist mechanism, this will ensure the driver is not loaded at the boot time.<br /><pre>How do I blacklist a kernel module to prevent it from loading automatically?<br />https://access.redhat.com/solutions/41278 <br /></pre></p>`,
  affectedPackages: [
    {
      cpe: "cpe:/a:redhat:openstack:13::el7",
      product: "Red Hat OpenStack Platform 13.0 - ELS",
      advisory: {
        name: "RHSA-2023:3161",
        release_date: "2023-05-17T01:57:13+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3161",
      },
      package: "openstack-nova",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:13::el7",
      product: "Red Hat OpenStack Platform 13.0 - ELS",
      advisory: {
        name: "RHSA-2023:3161",
        release_date: "2023-05-17T01:57:13+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3161",
      },
      package: "python-glance-store",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:13::el7",
      product: "Red Hat OpenStack Platform 13.0 - ELS",
      advisory: {
        name: "RHSA-2023:3161",
        release_date: "2023-05-17T01:57:13+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3161",
      },
      package: "python-os-brick",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:13::el7",
      product: "Red Hat OpenStack Platform 13.0 (Queens) for RHEL 7.6 EUS",
      advisory: {
        name: "RHSA-2023:3161",
        release_date: "2023-05-17T01:57:13+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3161",
      },
      package: "openstack-nova",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:13::el7",
      product: "Red Hat OpenStack Platform 13.0 (Queens) for RHEL 7.6 EUS",
      advisory: {
        name: "RHSA-2023:3161",
        release_date: "2023-05-17T01:57:13+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3161",
      },
      package: "python-glance-store",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:13::el7",
      product: "Red Hat OpenStack Platform 13.0 (Queens) for RHEL 7.6 EUS",
      advisory: {
        name: "RHSA-2023:3161",
        release_date: "2023-05-17T01:57:13+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3161",
      },
      package: "python-os-brick",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.1::el8",
      product: "Red Hat OpenStack Platform 16.1",
      advisory: {
        name: "RHSA-2023:3156",
        release_date: "2023-05-17T01:02:32+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3156",
      },
      package: "openstack-cinder",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.1::el8",
      product: "Red Hat OpenStack Platform 16.1",
      advisory: {
        name: "RHSA-2023:3156",
        release_date: "2023-05-17T01:02:32+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3156",
      },
      package: "openstack-nova",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.1::el8",
      product: "Red Hat OpenStack Platform 16.1",
      advisory: {
        name: "RHSA-2023:3156",
        release_date: "2023-05-17T01:02:32+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3156",
      },
      package: "python-glance-store",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.1::el8",
      product: "Red Hat OpenStack Platform 16.1",
      advisory: {
        name: "RHSA-2023:3156",
        release_date: "2023-05-17T01:02:32+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3156",
      },
      package: "python-os-brick",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.2::el8",
      product: "Red Hat OpenStack Platform 16.2",
      advisory: {
        name: "RHSA-2023:3158",
        release_date: "2023-05-17T01:04:39+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3158",
      },
      package: "openstack-cinder",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.2::el8",
      product: "Red Hat OpenStack Platform 16.2",
      advisory: {
        name: "RHSA-2023:3158",
        release_date: "2023-05-17T01:04:39+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3158",
      },
      package: "openstack-nova",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.2::el8",
      product: "Red Hat OpenStack Platform 16.2",
      advisory: {
        name: "RHSA-2023:3158",
        release_date: "2023-05-17T01:04:39+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3158",
      },
      package: "python-glance-store",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.2::el8",
      product: "Red Hat OpenStack Platform 16.2",
      advisory: {
        name: "RHSA-2023:3158",
        release_date: "2023-05-17T01:04:39+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3158",
      },
      package: "python-os-brick",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.2::el8",
      product: "Red Hat OpenStack Platform 16.2",
      advisory: {
        name: "RHSA-2023:3158",
        release_date: "2023-05-17T01:04:39+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3158",
      },
      package: "tripleo-ansible",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:17.0::el9",
      product: "Red Hat OpenStack Platform 17.0",
      advisory: {
        name: "RHSA-2023:3157",
        release_date: "2023-05-17T01:02:40+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3157",
      },
      package: "openstack-cinder",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:17.0::el9",
      product: "Red Hat OpenStack Platform 17.0",
      advisory: {
        name: "RHSA-2023:3157",
        release_date: "2023-05-17T01:02:40+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3157",
      },
      package: "openstack-nova",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:17.0::el9",
      product: "Red Hat OpenStack Platform 17.0",
      advisory: {
        name: "RHSA-2023:3157",
        release_date: "2023-05-17T01:02:40+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3157",
      },
      package: "python-glance-store",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:17.0::el9",
      product: "Red Hat OpenStack Platform 17.0",
      advisory: {
        name: "RHSA-2023:3157",
        release_date: "2023-05-17T01:02:40+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3157",
      },
      package: "python-os-brick",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
    {
      cpe: "cpe:/a:redhat:openstack:17.0::el9",
      product: "Red Hat OpenStack Platform 17.0",
      advisory: {
        name: "RHSA-2023:3157",
        release_date: "2023-05-17T01:02:40+00:00",
        type: "RHSA",
        url: "https://access.redhat.com/errata/RHSA-2023:3157",
      },
      package: "tripleo-ansible",
      state: "Fixed",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
    },
    {
      cpe: "cpe:/a:redhat:openstack:13",
      product: "Red Hat OpenStack Platform 13 (Queens)",
      advisory: {},
      package: "openstack-cinder",
      state: "Will not fix",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
    },
    {
      cpe: "cpe:/a:redhat:openstack:16.1",
      product: "Red Hat OpenStack Platform 16.1",
      advisory: {},
      package: "tripleo-ansible",
      state: "Not affected",
      lifecycle_url:
        "https://access.redhat.com/support/policy/updates/openstack/platform/",
      impact: "important",
    },
  ],
};

const _faqData = [
  {
    'heading': `Why is Red Hat's CVSS v3 score or Impact different from other vendors?`,
    'panel': `<p>For open source software shipped by multiple vendors, the CVSS base scores may vary for each vendor's version depending on the version they ship, how they ship it, the platform, and even how the software is compiled. This makes scoring of vulnerabilities difficult for third-party vulnerability databases such as NVD that only provide a single CVSS base score for each vulnerability. Red Hat scores reflect how a vulnerability affects our products specifically.</p><p><a href="https://access.redhat.com/solutions/762393">https://access.redhat.com/solutions/762393</a></p>`
  },
  {
    'heading': `My product is listed as "Under investigation" or "Affected", when will Red Hat release a fix for this vulnerability?`,
    'panel': `<ul><li>"Under investigation" doesn't necessarily mean that the product is affected by this vulnerability. It only means that our Analysis Team is still working on determining whether the product is affected and how it is affected.</li><li>"Affected" means that our Analysis Team has determined that this product is affected by this vulnerability and might release a fix to address this in the near future.</li></ul>`
  },
  {
    'heading': `What can I do if my product is listed as "Will not fix"?`,
    'panel': `<p>This depends mostly on the Impact of the vulnerability and the Life Cycle phase in which your product is currently in. Overall, you have the following options:</p><ul><li>Upgrade to a supported product version that includes a fix for this vulnerability (recommended)</li><li>Apply a mitigation (if one exists)</li><li>Open a support case to request a prioritization of releasing a fix for this vulnerability</li></ul>`
  },
  {
    'heading': 'I have a Red Hat product but it is not in the above list, is it affected?',
    'panel': `<p>The listed products were found to include one or more of the components that this vulnerability affects. These products underwent a thorough evaluation to determine their affectedness by this vulnerability. Note that layered products (such as container-based offerings) that consume affected components from any of the products listed in this table may be affected and are not represented.</p>`
  },
  {
    'heading': 'Why is my security scanner reporting my product as vulnerable to this vulnerability even though my product version is fixed or not affected?',
    'panel': `<p>In order to maintain code stability and compatibility, Red Hat usually does not rebase packages to entirely new versions. Instead, we backport fixes and new features to an older version of the package we distribute. This can result in some security scanners that only consider the package version to report the package as vulnerable. To avoid this, we suggest that you use an OVAL-compatible security scanner like OpenSCAP.</p>`
  }
];

function App() {
  const [cveData] = useState(_cveData);
  const [faqData] = useState(_faqData);

  return (
    <>
      <section className="light">
        <div className="container">
          <h1>{ cveData.name }</h1>
          <div>
            <p>
              Public on <Timestamp dateFormat="full" date={ new Date(cveData.published * 1000).toString() } /><br />
              Last modified: <Timestamp dateFormat="full" timeFormat="short" date={ new Date(cveData.lastModified * 1000).toString() } utc />
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h2>Description</h2>
              <p>{ cveData.description }</p>
              <h2>Mitigation</h2>
              <div dangerouslySetInnerHTML={{ __html: cveData.mitigation }} />
            </div>
            <div className="col-md-4 offset-md-1">
              <div>
                <rh-card>
                  <h3 slot="header">Additional information</h3>
                  <ul className="no-margin-padding">
                    <li>Bugzilla 2186099: Out-of-bound memory access in WebGL on macOS</li>
                    <li>CWE-787: Out-of-bounds Write</li>
                    <li>FAQ: Frequently asked questions about CVE-2023-29531</li>
                  </ul>
                </rh-card>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Affected Packages and Issued Red Hat Security Errata</h2>
              <Table isStriped borders>
                <Thead>
                  <Tr>
                    <Th>Platform</Th>
                    <Th>Package</Th>
                    <Th>State</Th>
                    <Th>Errata</Th>
                    <Th>Release Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cveData.affectedPackages.map((affectedPackage, index) => 
                    <Tr key={ index }>
                      <Td>{ affectedPackage.product }</Td>
                      <Td>{ affectedPackage.package }&nbsp;<rh-badge state={ affectedPackage.impact }>{ affectedPackage.impact }</rh-badge></Td>
                      <Td>{ affectedPackage.state }</Td>
                      <Td><a href={affectedPackage.advisory.url}>{ affectedPackage.advisory.name }</a></Td>
                      <Td><Timestamp dateFormat="medium" date={ affectedPackage.advisory.release_date } /></Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <h2>Common Vulnerability Scoring System (CVSS) Score Details</h2>
              <rh-alert state="info">
                <h3 slot="header">Important note</h3>
                <p>CVSS scores for open source components depend on vendor-specific factors (e.g. version or build chain). Therefore, Red Hat's score and impact rating can be different from NVD and other vendors. Red Hat remains the authoritative CVE Naming Authorities (CNA) source for its products and services (see <a href="https://access.redhat.com/security/updates/classification#cvss">Red Hat classifications</a>).</p>
              </rh-alert>
            </div>
          </div>
        </div>
      </section>
      <section className="light">
        <div className="container">
          <h2>Frequently asked questions</h2>
          <Accordion>
            {faqData.map((item, index) => 
              <Fragment key={ index }>
                <AccordionHeader>
                  <h3>{ item.heading }</h3>
                </AccordionHeader>
                <AccordionPanel dangerouslySetInnerHTML={{ __html: item.panel }} />
              </Fragment>
            )}
          </Accordion>
          <Popover 
            heading="Popover heading"
            body="Popovers are triggered by click rather than hover."
            footer="Popover footer">
            <Button variant="link">Toggle popover</Button>
          </Popover>
        </div>
      </section>
    </>
  )
}

export default App
