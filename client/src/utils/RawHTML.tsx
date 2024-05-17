interface RawHtmlComponentProps {
  htmlContent: string;
}

const RawHtmlComponent: React.FC<RawHtmlComponentProps> = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default RawHtmlComponent;
