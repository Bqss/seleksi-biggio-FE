class Story{
  static async getAllStory(params : {params : }): Promise<Story> {
    const response = await axios.get("http://localhost:3000/api/story" + paramify({
      search: searchParams,
      category,
      status
    })).then(res => {
      return res.data.data;
    }).catch(err => {
      console.log(err);
    }),;
    const story = await response.json();
    return story;
  }
}

export default Story;