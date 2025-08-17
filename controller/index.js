export const main = async (req, res, err) => {
  try {
    return res.status(200).json({
      title: "Success",
      message: "The app is working properly!",
    })
  } catch (error) {
    return err(error)
  }
}
