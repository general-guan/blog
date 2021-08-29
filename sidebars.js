module.exports = {
  docs: [
    'README',
    'Axios',
    {
      type: 'category',
      label: 'JavaScript',
      items: [
        {
          type: 'category',
          label: '数据类型',
          items:[
            'JavaScript/types/general',
            'JavaScript/types/null-undefined-boolean',
            'JavaScript/types/number',
            'JavaScript/types/string',
            'JavaScript/types/object',
            'JavaScript/types/function',
            'JavaScript/types/array',
          ]
        },
        {
          type: 'category',
          label: '运算符',
          items:[
            'JavaScript/operators/arithmetic'
          ]
        },
        'JavaScript/thanks'
      ],
    },
    {
      type: 'category',
      label: 'TypeScript',
      items: [
        'TypeScript/quickstart',
        'TypeScript/basic-types',
        'TypeScript/interfaces',
        'TypeScript/class',
        'TypeScript/function',
        'TypeScript/generics',
        'TypeScript/enums',
        'TypeScript/advanced-types',
        'TypeScript/lint',
        'TypeScript/thanks',
      ],
    },
    {
      type: 'category',
      label: 'Web API',
      items: [
        'WebAPI/file',
        'WebAPI/thanks',
      ],
    },
    'Redux/Redux',
    'Vite',
  ],
};
