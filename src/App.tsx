import { useState, Fragment, useEffect } from "react"
import { Accordion } from "@patternfly/elements/react/pf-accordion/pf-accordion.js"
import { AccordionHeader } from "@patternfly/elements/react/pf-accordion/pf-accordion-header.js"
import { AccordionPanel } from "@patternfly/elements/react/pf-accordion/pf-accordion-panel.js"
import { Popover } from "@patternfly/elements/react/pf-popover/pf-popover.js"
import { Button } from "@patternfly/elements/react/pf-button/pf-button.js"
import { PfIcon } from "@patternfly/elements/pf-icon/pf-icon.js"
import { Timestamp } from "@patternfly/elements/react/pf-timestamp/pf-timestamp.js"
import { Spinner } from "@patternfly/elements/react/pf-spinner/pf-spinner.js"
import { Table, Thead, Tbody, Th, Tr, Td } from "@patternfly/react-table"
import "@rhds/elements/rh-alert/rh-alert"
import "@rhds/elements/rh-card/rh-card"
import "@rhds/elements/rh-badge/rh-badge"
import "@cpelements/elements/cp-404/cp-404"
import "@patternfly/react-core/dist/styles/base-no-reset.css"
import "./App.css"

import Nav from "./components/nav/Nav"
import Footer from "./components/footer/Footer"

PfIcon.getIconUrl = (set, icon) => `@patternfly/icons/${set}/${icon}.js`;

type CveData = {
  title: string
  created: number
  revision_timestamp: number
  description: string
  statement: string
  mitigation: string
  affectedPackages: Array<{
    product: string
    package: string
    impact: string
    state: string
    advisory: {
      url: string
      name: string
      release_date: string
    }
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ['rh-alert']: unknown;
      ['rh-card']: unknown;
      ['rh-badge']: unknown;
      ['cp-404']: unknown;
    }
  }
}

function App() {
  const [cveData, setCveData] = useState<CveData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const searchParams: URLSearchParams = new URLSearchParams(location.search);
    const cve: string = searchParams.get('cve') || '';

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(`https://access.redhat.com/api/redhat_node/${cve}.json?lang=en`);
        
        if (!res.ok) {
          switch(res.status) {
            case 403:
            case 404:
              setError(true);
              break;
          }
          
          setLoading(false);
          return;
        }

        const data = await res.json();

        const _cveData: CveData = {
          title: data.title,
          created: data.created,
          revision_timestamp: data.revision_timestamp,
          affectedPackages: data.field_cve_releases_txt.und[0].object,
          description: data.field_cve_details_text.und[0].safe_value,
          statement: data.field_cve_statement_text && data.field_cve_statement_text.und && data.field_cve_statement_text.und[0].safe_value || '',
          mitigation: data.field_cve_mitigation_text && data.field_cve_mitigation_text.und && data.field_cve_mitigation_text.und[0].safe_value || '',
          faqs: data.field_cve_faq_txt.und[0].object,
        }
        
        setCveData(_cveData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, []);

  return (
    <>
      <header>
        <Nav />
      </header>
      {loading ? (
        <section className="loading">
          <Spinner>Loading...</Spinner>
        </section>
      ) : null}
      {!loading && error ? (
        <div className="container">
          <div className="row">
            <cp-404 />
          </div>
        </div>
      ) : null}
      {!loading && cveData ? (
        <>
          <section className="light">
          <div className="container">
            <h1>{ cveData.title }</h1>
            <div>
              <p>
                Public on <Timestamp dateFormat="full" date={ new Date(cveData.created * 1000).toString() } /><br />
                Last modified: <Timestamp dateFormat="full" timeFormat="short" date={ new Date(cveData.revision_timestamp * 1000).toString() } utc />
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <h2>Description</h2>
                <p dangerouslySetInnerHTML={{ __html: cveData.description }} />
                {cveData.statement && (
                  <>
                    <h2>Statement</h2>
                    <div dangerouslySetInnerHTML={{ __html: cveData.statement }}></div>
                  </>
                )}
                {cveData.mitigation && (
                  <>
                    <h2>Mitigation</h2>
                    <div dangerouslySetInnerHTML={{ __html: cveData.mitigation }} />
                  </>
                )}
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
                    {cveData.affectedPackages && cveData.affectedPackages.map((affectedPackage, index) => 
                      <Tr key={ index }>
                        <Td>{ affectedPackage.product }</Td>
                        <Td>{ affectedPackage.package }&nbsp;<rh-badge state={ affectedPackage.impact }>{ affectedPackage.impact }</rh-badge></Td>
                        <Td>{ affectedPackage.state }</Td>
                        <Td>
                          {affectedPackage.advisory.url ? (
                            <a href={affectedPackage.advisory.url}>{ affectedPackage.advisory.name }</a>
                          ) : null}
                        </Td>
                        <Td>
                          {affectedPackage.advisory.release_date ? (
                            <Timestamp dateFormat="medium" date={ affectedPackage.advisory.release_date } />
                          ) : null}
                        </Td>
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
              {cveData.faqs.map((item, index) => 
                <Fragment key={ index }>
                  <AccordionHeader>
                    <h3>{ item.question }</h3>
                  </AccordionHeader>
                  <AccordionPanel dangerouslySetInnerHTML={{ __html: item.answer }} />
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
      ) : null}
      <Footer />
    </>
  )
}

export default App
