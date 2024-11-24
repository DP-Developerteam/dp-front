//Import styles and libraries
import '../App.scss';
import React from 'react';
// Import framer motion
import { motion } from 'framer-motion';
//Import images
import logoAfterEffects from '../assets/img/logo-aftereffects.svg';
import logoAngular from '../assets/img/logo-angular.webp';
import logoIllustrator from '../assets/img/logo-illustrator.svg';
import logoIndesign from '../assets/img/logo-indesign.svg';
import logoLightroom from '../assets/img/logo-lightroom.svg';
import logoNodeJS from '../assets/img/logo-nodejs.svg';
import logoPhotoshop from '../assets/img/logo-photoshop.svg';
import logoPhp from '../assets/img/logo-php.svg';
import logoPremierPro from '../assets/img/logo-premierpro.svg';
import logoReact from '../assets/img/logo-react.svg';
import logoTailwind from '../assets/img/logo-tailwind.svg';
import logoVue from '../assets/img/logo-vue.svg';

import logoHtml from '../assets/img/logo-html.svg';
import logoCss from '../assets/img/logo-css.svg';
import logoJavascript from '../assets/img/logo-js.svg';
import logoTypescript from '../assets/img/logo-ts.svg';
import logoLess from '../assets/img/logo-less.svg';
import logoSass from '../assets/img/logo-sass.svg';

import imgWebsite from '../assets/img/img-website.webp'


function Homepage() {
    return (
        <div className='page homepage'>
            <section className='hero layout-big-title'>
                <div className='intro-text column-start'>
                    <h1 className='name-tag bold'>Diego Pérez - Freelance</h1>
                    <ul className='description-container'>
                        <li className='description-tag'>Webflow design</li>
                        <li className='description-tag'>Corporate identity</li>
                        <li className='description-tag'>Frontend developer</li>
                        <li className='description-tag bold hover'>For startups with taste<span className='dot'></span><span className='contact'>Contact</span></li>
                    </ul>
                </div>
                <h6 className='title-tag'>A bit of <span className='color'>this</span><br/>a bit of <span className='color'>that</span></h6>
            </section>

            <motion.section
                className="layout-big-card column-start"
                initial={{ opacity: 0.1, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }} // Trigger when 80% of the section is in view
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className='items-container row-start'>
                    <div className='item column-start'>
                        <h2 className='subtitle'>Do you seek...</h2>
                        <p className='paragraph'>A refined, Swiss-inspired design aesthetic?</p>
                        <p className='paragraph'>Captivating, seamless animations?</p>
                        <p className='paragraph'>A website that grows with your brand?</p>
                        <p className='paragraph bold'>Explore what’s possible</p>
                    </div>
                    <div className='item column-start'>
                        <img className='img' src={imgWebsite} alt='' width='340px' height='200px'/>
                    </div>
                </div>
            </motion.section>
            {/* <section className='layout-big-card column-start'>
                <div className='items-container row-start'>
                    <div className='item column-start'>
                        <h2 className='subtitle'>Do you seek...</h2>
                        <p className='paragraph'>A refined, Swiss-inspired design aesthetic?</p>
                        <p className='paragraph'>Captivating, seamless animations?</p>
                        <p className='paragraph'>A website that grows with your brand?</p>
                        <p className='paragraph bold'>Explore what’s possible</p>
                    </div>
                    <div className='item column-start'>
                        <img className='img' src={imgWebsite} alt='' width='340px' height='200px'/>
                    </div>
                </div>
            </section> */}

            <section className='layout-bento column-start'>
                <div className='text-boxes-container column-start'>
                    <div className='text-container column-start'>
                        <h3 className='subtitle'>Services</h3>
                        <p className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis aliquet urna, quis dignissim ex dignissim in. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className='boxes-container row-start'>
                        <div className='box column-end'>
                            <div className='icon top-left' />
                            <div className='icon top-right' />
                            <p className='paragraph'>Web development</p>
                        </div>
                        <div className='box column-end'>
                            <div className='icon top-left' />
                            <div className='icon top-right' />
                            <p className='paragraph'>Graphic design</p>
                        </div>
                    </div>
                </div>
                <div className='text-boxes-container column-start'>
                    <div className='text-container column-start'>
                        <h3 className='subtitle'>Workflow</h3>
                        <p className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis aliquet urna, quis dignissim ex dignissim in. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className='boxes-container row-start'>
                        <div className='box box-large column-end'>
                            <span className='navDots'/>
                            <p className='paragraph'>Lorem ipsum</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='horizontal-scroller column-center'>
                <div className='items'>
                    <div className='item column-center'>
                        <img className='logo' src={logoHtml} alt='' width='40px' height='40px'/>
                        <p>HTML</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoCss} alt='' width='40px' height='40px'/>
                        <p>CSS</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoJavascript} alt='' width='40px' height='40px'/>
                        <p>JavaScript</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoTypescript} alt='' width='40px' height='40px'/>
                        <p>TypeScript</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoLess} alt='' width='40px' height='40px'/>
                        <p>LESS</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoSass} alt='' width='40px' height='40px'/>
                        <p>SASS</p>
                    </div>
                </div>
                <div className='items'>
                    <div className='item column-center'>
                        <img className='logo' src={logoTailwind} alt='' width='40px' height='40px'/>
                        <p>Tailwind</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoReact} alt='' width='40px' height='40px'/>
                        <p>React</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoAngular} alt='' width='40px' height='40px'/>
                        <p>Angular</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoVue} alt='' width='40px' height='40px'/>
                        <p>VUE</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoNodeJS} alt='' width='40px' height='40px'/>
                        <p>NodeJS</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoPhp} alt='' width='40px' height='40px'/>
                        <p>PHP</p>
                    </div>
                </div>
                <div className='items'>
                    <div className='item column-center'>
                        <img className='logo' src={logoPremierPro} alt='' width='40px' height='40px'/>
                        <p>Premier Pro</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoIllustrator} alt='' width='40px' height='40px'/>
                        <p>Illustrator</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoPhotoshop} alt='' width='40px' height='40px'/>
                        <p>Photoshop</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoIndesign} alt='' width='40px' height='40px'/>
                        <p>InDesign</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoAfterEffects} alt='' width='40px' height='40px'/>
                        <p>After Effects</p>
                    </div>
                    <div className='item column-center'>
                        <img className='logo' src={logoLightroom} alt='' width='40px' height='40px'/>
                        <p>Lightroom</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Homepage