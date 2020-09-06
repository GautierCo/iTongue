import React, { Component } from 'react'
import { Accordion, Icon, Header } from 'semantic-ui-react'
import Layout from "../../containers/Layout";
import './style.scss';

export default class Terms extends Component {
  state = { activeIndex: 99 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
        <Layout titlePage="Terms">
            <Header as='h4' block className="titleTerms">
                Merci de lire attentivement les présentes modalités d'utilisation du présent site avant de le parcourir. <br />
                En vous connectant sur ce site, vous acceptez sans réserve les présentes modalités.
            </Header>
            <Accordion styled className="accordionTerms">
                <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                Conditions d'utilisation
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                <p>
                  Le site accessible par les url suivants : www.itongue.io est exploité dans le respect de la législation française.
                  L'utilisation de ce site est régie par les présentes conditions générales.
                  En utilisant le site, vous reconnaissez avoir pris connaissance de ces conditions et les avoir acceptées. 
                  Celles-ci pourront êtres modifiées à tout moment et sans préavis par la société iTongue.
                  iTongue ne saurait être tenu pour responsable en aucune manière d’une mauvaise utilisation du service. 
                </p>
                </Accordion.Content>

                <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                Limite de responsabilités
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                <p>
                Les informations contenues sur ce site sont aussi précises que possibles et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email en décrivant le problème de la manière la plus précise possible (page posant problème, action déclenchante, type d’ordinateur et de navigateur utilisé, …)
                Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité. 
                En conséquence, iTongue ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur de l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement.     
                Les photos sont non contractuelles.
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de Natural net.
                </p>
                </Accordion.Content>

                <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                Droit d'accès
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                <p>
                En application de cette loi, les internautes disposent d’un droit d’accès, de rectification, de modification et de suppression concernant les données qui les concernent personnellement. 
                Ce droit peut être exercé par voie électronique à l’adresse email suivante : contact@itongue.fr.
                Les informations personnelles collectées ne sont en aucun cas confiées à des tiers hormis pour l’éventuelle bonne exécution de la prestation commandée par l’internaute.
                </p>
                </Accordion.Content>

                <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                Confidentialité
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                <p>
                  Vos données personnelles sont confidentielles et ne seront en aucun cas communiquées à des tiers hormis pour la bonne exécution de la prestation.
                </p>
                </Accordion.Content>

                <Accordion.Title
                active={activeIndex === 4}
                index={4}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                Cookies
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 4}>
                <p>
                  Pour des besoins de statistiques et d'affichage, le présent site utilise des cookies. 
                  Il s'agit de petits fichiers textes stockés sur votre disque dur afin d'enregistrer des données techniques sur votre navigation. 
                  Certaines parties de ce site ne peuvent être fonctionnelle sans l’acceptation de cookies.
                </p>
                </Accordion.Content>
            </Accordion>
        </Layout>
    )
  }
}