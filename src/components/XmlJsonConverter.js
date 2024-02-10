import React, { useState } from 'react';
import axios from 'axios';
import vkbeautify from 'vkbeautify';
import { FaCog, FaWrench, FaCompress, FaTrash } from 'react-icons/fa';
import { minify } from 'xml-minifier';
import XmlEditor from './XmlEditor';
import JsonEditor from './JsonEditor';
import Header from './Header';
import Footer from './Footer';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const XmlJsonConverter = () => {
  const [xmlPayload, setXmlPayload] = useState('');
  const [jsonResult, setJsonResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState('');

  const tooltip = (text) => (
    <Tooltip id="tooltip">
      {text}
    </Tooltip>
  );

  const renderTooltip = (icon, action, text) => (
    <OverlayTrigger
      placement="left"
      overlay={tooltip(text)}
    >
      <div onClick={action} onMouseEnter={() => handleIconHover(text)} onMouseLeave={handleIconLeave}>
        {icon}
      </div>
    </OverlayTrigger>
  );
  const handleXmlChange = (xml) => {
    setXmlPayload(xml);
  };
  const handleConvert = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const response = await axios.post('https://kadamharshad25-eval-prod.apigee.net/u/cp', xmlPayload, {
        // const response = await axios.post('https://apis-dev.globalpay.com/v1/boarding/propay', xmlPayload, {
        mode: 'no-cors',
        // method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          'Access-Control-Allow-Origin': '*'
        },
      });
      // if (!response.ok) {
      //   throw new Error(`Failed to convert XML to JSON. Status: ${response.status}`);
      // }

      const data = response.data;
      //   const contentType = response.headers.get('content-type');

      // if (contentType && contentType.includes('application/json')) {
      setJsonResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error converting XML to JSON:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBeautifyXml = () => {
    const beautifiedXml = vkbeautify.xml(xmlPayload).trim();
    setXmlPayload(beautifiedXml);
    setDropdownOpen(false); // Close the dropdown
  };

  const handleMinifyXml = () => {
    const minifiedXml = minify(xmlPayload);
    setXmlPayload(minifiedXml);
    setDropdownOpen(false); // Close the dropdown
  };

  const handleClearAll = () => {
    setXmlPayload('');
    setJsonResult('');
    setDropdownOpen(false); // Close the dropdown
  };

  const handleIconHover = (text) => {
    setTooltipText(text);
  };

  const handleIconLeave = () => {
    setTooltipText('');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="app-container">
      <Header />
      <div className="buttons-container">
        {loading ? <p>Processing...</p> : (
          <>
            <div onClick={handleConvert}>Contracts Convert</div>
          </>
        )}
      </div>
      <div className="editors-container">
        <div className="editor-pane">
          <div className="editor-buttons">
            <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>




              <div>

                <div
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default behavior
                    toggleDropdown();
                  }}
                  className="cog-button"
                >
                  <FaCog
                    className={`cog-icon ${isDropdownOpen ? 'rotate' : ''}`}
                    onMouseEnter={() => handleIconHover('Settings')}
                    onMouseLeave={handleIconLeave}
                  />
                </div>
                <div className="dropdown-content">
                  {renderTooltip(<FaWrench />, handleBeautifyXml, 'Beautify')}
                  {renderTooltip(<FaCompress />, handleMinifyXml, 'Minify')}
                  {renderTooltip(<FaTrash />, handleClearAll, 'Clear')}
                </div>
              </div>

            </div>
            {tooltipText && <div className="tooltip">{tooltipText}</div>}
          </div>
          <XmlEditor xml={xmlPayload} onChange={handleXmlChange} />
        </div>
        <JsonEditor json={jsonResult} />
      </div>
      <Footer />
    </div>
  );
};

export default XmlJsonConverter;
