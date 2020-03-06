import React, {Component} from 'react';

import FooterMenu from './FooterMenu/FooterMenu';
import FooterSocials from './FooterSocials/FooterSocials';

class Footer extends Component {
    render() {
        return (
            <footer>
                <FooterMenu />
                <FooterSocials />
            </footer>
        );
    }
}

export default Footer;