import { Accordion } from "@patternfly/elements/react/pf-accordion/pf-accordion.js"
import { AccordionHeader } from "@patternfly/elements/react/pf-accordion/pf-accordion-header.js"
import { AccordionPanel } from "@patternfly/elements/react/pf-accordion/pf-accordion-panel.js"

function App() {
  return (
    <>
      <div>
        <h1>PatternFly Elements React accordion</h1>
        <Accordion>
          <AccordionHeader>
            <h2>Item 1</h2>
          </AccordionHeader>
          <AccordionPanel>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugit unde ut quaerat cupiditate illum ipsam non aperiam vitae, laboriosam rerum id veniam quia perspiciatis et molestiae dignissimos voluptatum eos.</p>
          </AccordionPanel>
        </Accordion>
      </div>
    </>
  )
}

export default App
