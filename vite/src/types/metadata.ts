export interface INftMetadata {
  image: string;
  name: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
}

export interface ISaleNftMetadata extends INftMetadata {
  price: bigint;
  tokenOwner: string;
}
