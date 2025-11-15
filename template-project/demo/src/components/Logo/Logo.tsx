import './Logo.scss';

/**
 * Logo component displaying the application name
 */
export const Logo = () => {
    return (
        <span className="logo">
            <span className="primary">ML</span>
            <span className="secondary">Classifier</span>
        </span>
    );
}
