import { DNA } from 'react-loader-spinner';
export const Loading = () => {
  return (
<div style={{display: 'flex', justifyContent: 'center', marginTop: '250px'}}>
<DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
</div>
  )
}
