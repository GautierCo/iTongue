import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import './style.scss';

export default class FAQ extends Component {
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
        <div className="faq-div">
            <Accordion styled>
                <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                Je souhaite m'inscrire ? 
                Comment faire ?
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                <p>
                    En haut de l'écran, il y a un menu en forme d'hamburger. <br />
                    Au clique, un menu déroulant s'affiche. <br />
                    Il ne vous reste plus qu'à cliquer sur "Inscription" et à renseigner vos coordonnées.
                </p>
                </Accordion.Content>

                <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
                >
                <Icon name='dropdown' />
                Je souhaite enregistrer un iRecord. 
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                <p>
                    Vous ne pouvez enregistrer qu'à la condition d'avoir un profil utilisateur et d'être connecté. <br />
                    Une fois connecté, en bas de votre écran, vous avez une barre avec plusieurs icônes. <br />
                    Cliquez sur l'icône en forme de micro, et enregistrez vous !
                </p>
                </Accordion.Content>

            </Accordion>
        </div>
        
    )
  }
}