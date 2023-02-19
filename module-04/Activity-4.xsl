<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/"> 
        <html>
            <body>
                <h2>Table 1</h2>
                <table border="1">
                    <tr bgcolor="pink">
                        <th>Product Name</th>
                        <th>Manufacturer ID</th>
                        <th>Description</th>
                        <th>USD Price</th>
                    </tr>
                    <xsl:for-each select="products/product[@shippable='true']">
                        <tr bgcolor="skyblue">
                            <td><xsl:value-of select="productName"/></td>
                            <td><xsl:value-of select="manufacturer"/></td>
                            <td><xsl:value-of select="description"/></td>
                            <td><xsl:value-of select="prices/price[1]"/></td>
                        </tr>
                    </xsl:for-each> 
                </table>  
                <h2>Table 2</h2>   
                <table border="1">
                    <tr bgcolor="pink">
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>USD Price</th>
                        <th>Euro Price</th>
                    </tr>
                    <xsl:for-each select="//product[manufacturer/@id='acme']">
                        <tr bgcolor="skyblue">
                            <td><xsl:value-of select="productName"/></td>
                            <td><xsl:value-of select="description"/></td>
                            <td><xsl:value-of select="prices/price[1]"/></td>
                            <td><xsl:value-of select="prices/price[3]"/></td>
                        </tr>
                    </xsl:for-each>
                </table>          
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>