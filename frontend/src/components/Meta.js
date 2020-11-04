import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={desc} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to Tech Shop',
  desc: 'Shop for processors that suit your needs',
  keywords: 'CPU, shop CPU, processors, buy processors, CPU chips'
}

export default Meta
