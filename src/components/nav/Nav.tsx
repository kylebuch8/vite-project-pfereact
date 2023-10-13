import "./Nav.css"

function Nav () {
  return (
    <nav>
      <a href="https://access.redhat.com">
        <img width="235" height="40" alt="Red Hat Customer Portal" src="https://access.redhat.com/chrome_themes/nimbus/img/red-hat-customer-portal.svg" style={{maxWidth: "var(--pfe-navigation--logo--maxWidth, 235px)"}} />
      </a>
    </nav>
  )
}

export default Nav;