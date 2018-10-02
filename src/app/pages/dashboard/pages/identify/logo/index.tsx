import * as React from 'react';


export interface IProps {
  className?: string;
  maxWidth: number;
  maxHeight: number;
  src?: string;
  alt?: string;
}

export default class LogoImage extends React.Component<IProps, any> {

  public logo: string = '';
  public mounted = false;

  public state = {
    isComplete: false,
    width: 0,
    height: 0
  };

  public UNSAFE_componentWillMount() {
    const { src } = this.props;
    this.logo = src || '';

    this.loadImage(this.logo);
  }

  public UNSAFE_componentWillUpdate() {
    const { src } = this.props;
    this.logo = src || '';

    this.loadImage(this.logo);
  }

  public componentDidMount() {
    this.mounted = true;
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public loadImage(src: string) {
    const $img = document.createElement('img');

    $img.onload = () => {
      const { maxWidth, maxHeight } = this.props;


      if (this.mounted) {

        const size = calculateImageSize($img.width, $img.height, maxWidth, maxHeight);
        this.setState({ isComplete: true, width: size.width, height: size.height });

      }
    };

    $img.src = src;
  }

  public render() {
    const { className, alt = '' } = this.props;
    const { width, height, isComplete } = this.state;

    if (!isComplete) {
      return null;
    }

    return (
      <img
        className={className}
        style={{ width, height }}
        src={this.logo}
        alt={alt} />
    );
  }
}


function calculateImageSize(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number) {
  if ((width / maxWidth) > (height / maxHeight)) {
    return {
      width: maxWidth,
      height: maxWidth * (height / width)
    };
  } else {
    return {
      width: maxHeight * (width / height),
      height: maxHeight
    };
  }
}
