export const Mark = ({ name, keyword }: { name: string, keyword: string }) => {
  if (!keyword) return <>{name}</>

  const arr = name.split(keyword)

  return <>
    {
      arr.map((str: string, index: number) => <span key={index}>
        {str}
        {
          index === arr.length - 1 ? null : <span style={{ color: '#fd2529' }}>{keyword}</span>
        }
      </span>)
    }
  </>

}