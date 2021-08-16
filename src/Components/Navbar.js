import React from 'react';

class Navbar extends React.Component{
    render () {
        const leftLinksList = this.props.leftLinks;
        const rightLinksList = this.props.rightLinks;
        const rightLinks = rightLinksList.map(link => (
            <li><a href={link.url}>{link.title}</a></li>
        ));

        const leftLinks = leftLinksList.map(link => (
             <li><a href={link.url}>{link.title}</a></li>
        ));

        console.log(leftLinks);
        return (
            <div className="navbar">
                <ul className="navbar-left">
                    {leftLinks}
                </ul>
                <ul className="navbar-right">
                    {rightLinks}
                </ul>
            </div>
        );
    }
}

export default  Navbar;