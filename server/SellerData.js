import axios from 'axios';

//SEND SELLER DATA
exports.postSellerData =  function(req, res){
    const url = 'http://www.expample.com/register';
    const data = req.body.data;
    axios.post(url, data)
    .then(function(response){
      if(response.status === 200) {
        res.json(response.data);
      } else {
        res.status(400).json({ errors: { form: 'REGISTER_ERROR' } });
      }
    })
    .catch(function (error) {
      res.status(500).json({ errors: { form: 'UNEXPECTED_ERROR' } });
    });
};
